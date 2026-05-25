param(
  [int]$Port = 3001
)

$ErrorActionPreference = "Stop"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$PreviewDir = Join-Path $Root ".codex-preview"
$PidFile = Join-Path $PreviewDir "preview.pid"
$OutLog = Join-Path $PreviewDir "preview.out.log"
$ErrLog = Join-Path $PreviewDir "preview.err.log"

New-Item -ItemType Directory -Force -Path $PreviewDir | Out-Null

function Test-Preview {
  param([int]$TargetPort)

  try {
    $response = Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:$TargetPort/" -TimeoutSec 5
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

$listener = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1
if ($listener) {
  $process = Get-CimInstance Win32_Process -Filter "ProcessId = $($listener.OwningProcess)" -ErrorAction SilentlyContinue
  if ($process -and $process.CommandLine -like "*$Root*") {
    if (Test-Preview $Port) {
      Write-Output "Preview already running: http://127.0.0.1:$Port"
      exit 0
    }
  }

  Write-Error "Port $Port is already in use by process $($listener.OwningProcess). Stop that process or choose another port."
}

if (-not (Test-Path (Join-Path $Root "node_modules\next\dist\bin\next"))) {
  Write-Error "Dependencies are missing. Run npm.cmd install first."
}

$npm = (Get-Command npm.cmd).Source
$command = "Set-Location '$Root'; & '$npm' run preview:local"
$processInfo = Start-Process `
  -FilePath "powershell.exe" `
  -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", $command) `
  -WorkingDirectory $Root `
  -WindowStyle Hidden `
  -RedirectStandardOutput $OutLog `
  -RedirectStandardError $ErrLog `
  -PassThru

Set-Content -Path $PidFile -Value $processInfo.Id -Encoding ascii

$deadline = (Get-Date).AddSeconds(20)
while ((Get-Date) -lt $deadline) {
  if (Test-Preview $Port) {
    Write-Output "Preview started: http://127.0.0.1:$Port"
    exit 0
  }

  Start-Sleep -Milliseconds 500
}

Write-Error "Preview did not become reachable. See $OutLog and $ErrLog."
