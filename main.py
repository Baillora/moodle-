import os
def find_unique_lines():
    script_directory = os.path.dirname(os.path.abspath(__file__))
    data_directory = os.path.join(script_directory, 'data')
    unique_lines = set()
    for filename in os.listdir(data_directory):
        filepath = os.path.join(data_directory, filename)
        if os.path.isfile(filepath) and filename.endswith('.txt'):
            with open(filepath, 'r', encoding='utf-8') as file:
                unique_lines.update(line.strip() for line in file)
    output_file_path = os.path.join(script_directory, 'unique_lines.txt')
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        for line in unique_lines:
            output_file.write(line + '\n')
    print(f"Сохраннёный результат by Baillora: {output_file_path}")
find_unique_lines()
