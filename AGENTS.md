# Codex Notes

- Codex Web/cloud can use the default npm setup for this project. If manual setup is needed, run `npm ci`.
- Validate changes with `npm run lint` and `npm run build`.
- After frontend changes, always start or verify the local preview before the final response.
- Use `powershell -ExecutionPolicy Bypass -File scripts/start-preview.ps1` to start or reuse the stable preview server.
- The script prints the actual preview URL. It defaults to `http://127.0.0.1:3001` when no server is already running, but it may reuse an existing same-project server on another port.
- Include the actual preview URL in every final response for page/UI work.
- If the requested port is occupied by another project, do not silently switch ports. Explain the conflict and use the script with an explicit alternate port only after noting the final URL.
