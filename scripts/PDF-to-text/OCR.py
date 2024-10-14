import json
import os

# Provide your username and license code
LicenseCode = ''  # License code provided to you
UserName = ''  # Username provided to you

try:
    import requests
except ImportError:
    print("You need the requests library to be installed in order to use this sample.")
    print("Run 'pip install requests' to fix it.")

    exit()

# Extract text from an image using the ocrwebservice.com API on Croatian language
RequestUrl = "http://www.ocrwebservice.com/restservices/processDocument?language=croatian&pagerange=allpages&gettext=true&outputformat=xlsx";


def convert_and_download(file, filename):
    with open(file, 'rb') as image_file:
        image_data = image_file.read()

    r = requests.post(RequestUrl, data=image_data, auth=(UserName, LicenseCode))

    if r.status_code == 401:
        #  Please provide valid username and license code
        print("Unauthorized request")
        exit()

    # Decode Output response
    jobj = json.loads(r.content)
    print(jobj)
    outputfile_url = jobj["OutputFileUrl"]

    # Downloading output file
    response = requests.get(outputfile_url)
    with open(f"output/{filename}.xlsx", 'wb') as output_file:
        output_file.write(response.content)


for file in os.listdir("extract"):
    if file.endswith(".pdf"):
        FilePath = "extract/" + file
        convert_and_download(FilePath, file)
