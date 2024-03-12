import os
import shutil
import random
import string

def find_unique_lines(output_file_name):
    script_directory = os.path.dirname(os.path.abspath(__file__))
    data_directory = os.path.join(script_directory, 'data')
    unique_lines = set()
    for filename in os.listdir(data_directory):
        filepath = os.path.join(data_directory, filename)
        if os.path.isfile(filepath) and filename.endswith('.txt'):
            with open(filepath, 'r', encoding='utf-8') as file:
                unique_lines.update(line.strip() for line in file)
    output_file_path = os.path.join(script_directory, f'{output_file_name}.txt')
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        for line in unique_lines:
            output_file.write(line + '\n')
    print(f"Сохранённый результат: {output_file_path}")
    return output_file_path

def process_data_folder():
    output_file_name = input("Введите название файла с ответами: ")
    output_file_path = find_unique_lines(output_file_name)
    script_directory = os.path.dirname(os.path.abspath(__file__))
    data_directory = os.path.join(script_directory, 'data')
    confirm = input("Вы уверены, что хотите удалить все текстовые файлы в папке data? (y/n): ")
    if confirm.lower() == 'y':
        for filename in os.listdir(data_directory):
            filepath = os.path.join(data_directory, filename)
            if os.path.isfile(filepath) and filename.endswith('.txt'):
                os.remove(filepath)
        print("Текстовые файлы в папке 'data' успешно удалены.")
    else:
        print("Удаление отменено пользователем.")

if __name__ == "__main__":
    process_data_folder()
