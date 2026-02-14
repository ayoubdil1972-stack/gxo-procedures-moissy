#!/bin/bash
echo "export const SIMPLE_TASKS_HTML = \`" > src/templates/simple-tasks.ts
# Échapper les backticks et ${} dans le HTML
sed 's/`/\\`/g; s/\${/\\\${/g' public/driver-tasks-simple.html >> src/templates/simple-tasks.ts
echo "\`;" >> src/templates/simple-tasks.ts
