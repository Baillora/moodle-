import os
import shutil
import random
import string
def find_unique_lines():
    script_directory = os.path.dirname(os.path.abspath(__file__))
    data_directory = os.path.join(script_directory, 'data')
    unique_lines = set()
    for filename in os.listdir(data_directory):
        filepath = os.path.join(data_directory, filename)
        if os.path.isfile(filepath) and filename.endswith('.txt'):
            with open(filepath, 'r', encoding='utf-8') as file:
                unique_lines.update(line.strip() for line in file)
    random_name = ''.join(random.choices(string.ascii_letters + string.digits, k=15))
    output_file_path = os.path.join(script_directory, f'unique_lines_{random_name}.txt')
    while os.path.exists(output_file_path):
        random_name = ''.join(random.choices(string.ascii_letters + string.digits, k=15))
        output_file_path = os.path.join(script_directory, f'unique_lines_{random_name}.txt')
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        for line in unique_lines:
            output_file.write(line + '\n')
    print(f"Сохраннёный результат by Baillora: {output_file_path}")
    return output_file_path
def process_data_folder():
    output_file_path = find_unique_lines()
    script_directory = os.path.dirname(os.path.abspath(__file__))
    data_directory = os.path.join(script_directory, 'data')
    for filename in os.listdir(data_directory):
        filepath = os.path.join(data_directory, filename)
        if os.path.isfile(filepath):
            os.remove(filepath)
        elif os.path.isdir(filepath):
            shutil.rmtree(filepath)
    print("Ответы в папке data удалены.")
process_data_folder()
