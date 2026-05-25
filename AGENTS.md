# Codex Notes

- After frontend changes, always start or verify the local preview before the final response.
- Use `powershell -ExecutionPolicy Bypass -File scripts/start-preview.ps1` to start the stable preview server.
- The default preview URL is `http://127.0.0.1:3001`.
- Include that preview URL in every final response for page/UI work.
- If port `3001` is occupied by another project, do not silently switch ports. Explain the conflict and use the script with an explicit alternate port only after noting the final URL.
