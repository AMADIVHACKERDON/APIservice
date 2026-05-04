import yaml
from pathlib import Path
import re

example = '''//--------------- Example -------------------
const categories: Models.Category[] = [
    { id: "1", name: "web dev", slug: "web-dev" },
    { id: "1", name: "iot", slug: "iot" },
    { id: "1", name: "Machine Learning", slug: "machine-learning" },
];

// export function getCategories(request: Request, response: Response){
//     // Logic for getCategories
//     response.send({ data: categories });
// }

// -------------------------------------------
'''

def createFileSeries(file_name:Path, file_dir:Path):
    name = file_name.stem
    ext = file_name.suffix

    # get previous number if any
    num = name[-1]
    if num.isdigit():
        n = int(num) + 1
        name = name[:-1]
    else:
        n = 1

    new_file_name = name + str(n) + ext
    return file_dir.joinpath(new_file_name)

def generate():
    target_dir = Path("server")
    target_dir.mkdir(exist_ok=True)

    # files to create
    test_filename = "test-api.ts"
    server_filename = "app-server.ts"

    # 1. Load the spec
    curr_dir = Path(__file__).resolve()
    spec_dir = curr_dir.parent.parent.parent.parent
    spec_path = spec_dir.joinpath('openapi.yaml')
    if not spec_path.exists():
        raise FileNotFoundError(f"Error: {spec_path.name} not found")

    with open(spec_path, 'r') as f:
        spec = yaml.safe_load(f)

    # 2. Start building the Express file
    server_code = [
        'import express from "express";',
        f'import * as APIs from "./{test_filename}";',
        '',
        'const app = express();',
        'app.use(express.json());',
        'const PORT = 3000;',
    ]

    test_code = [
        '//OPTIONAL FILE: configure test for the server',
        f'import * as Models from "../../generated-api/models/index.js";',
        'import type { Request, Response } from "express";',
        '',
        example,
    ]

    # 3. Process Paths
    version = '/api/v1'
    paths = spec.get('paths', {})
    for path, methods in paths.items():
        # Convert OpenAPI path {id} to Express :id
        express_path = version + path.replace('{', ':').replace('}', '')
        
        for method, details in methods.items():
            if method.lower() not in ['get', 'post', 'put', 'delete', 'patch']:
                continue

            # Priority 1: Use operationId
            # Priority 2: Generate from method and path
            op_id = details.get('operationId')
            if not op_id:
                # Fallback: e.g., get_solutions_id_helpful
                clean_path = re.sub(r'[^a-zA-Z0-0]', '_', path).strip('_')
                op_id = f"{method.lower()}_{clean_path}"
            
            summary = details.get('summary', op_id)
            
            server_code.append("")
            server_code.append(f'// {summary}')
            server_code.append(f'app.{method.lower()}("{express_path}", APIs.{op_id});')

            test_code.append("")
            test_code.append(f"export function {op_id}(request: Request, response: Response){{")
            test_code.append(f"    // Logic for {op_id}")
            test_code.append("}")

    # 4. Finalize
    server_code.append('\napp.listen(PORT, () => {')
    server_code.append('    console.log(`🚀 Solutions API live at http://localhost:${PORT}`);')
    server_code.append('});')

    # Write to files

    # CREATE TEST FILE
    test_file = target_dir.joinpath(test_filename)
    with open(test_file, 'w', encoding="utf-8") as f:
        f.write("\n".join(test_code))

    # CREATE SERVER FILE
    server_file = target_dir.joinpath(server_filename)

    # Create numbered file if it already exists
    while server_file.exists():
        print(f"{server_filename} already exists")
        server_file = createFileSeries(server_file, target_dir)

    with open(server_file, 'w', encoding="utf-8") as f:
        f.write("\n".join(server_code))
    
if __name__ == "__main__":
    generate()
