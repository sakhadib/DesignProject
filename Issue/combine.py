import os

def combine_files(file_paths, output_file):
    try:
        with open(output_file, "w", encoding="utf-8") as output:
            for file_path in file_paths:
                # Ensure the file exists before trying to read it
                if os.path.isfile(file_path):
                    with open(file_path, "r", encoding="utf-8") as file:
                        output.write(f"\n--- Start of {file_path} ---\n")
                        output.write(file.read())
                        output.write(f"\n--- End of {file_path} ---\n\n")
                else:
                    print(f"File {file_path} does not exist!")
    except Exception as e:
        print(f"Error while combining files: {e}")

def main():
    # List of the files to combine
    files_to_combine = [
        "commit_info_mainrepo.txt",
        "file_list_mainrepo.txt",
        "file_list_AdminRepo.txt",
        "commit_info_AdminRepo.txt"
    ]
    
    # Define the output file path
    output_file_path = "combined_output.txt"
    
    # Combine the files
    combine_files(files_to_combine, output_file_path)
    
    print(f"Combined file saved as {output_file_path}")

if __name__ == "__main__":
    main()
