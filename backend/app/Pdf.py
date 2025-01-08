from fpdf import FPDF
from PyPDF2 import PdfReader, PdfWriter
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

output_directory = "./static/pdfs"
os.makedirs(output_directory, exist_ok=True)

output_path = os.path.join(output_directory, "pdf_1.pdf")
protected_output_path = os.path.join(output_directory, "protected.pdf")

pdf = FPDF('P', 'mm', 'Letter')
pdf.add_page()
pdf.set_font('helvetica', '', 16)
message = (f'Hello Mahesh,\n\n'
            f'Here is the result of your prediction request:\n'
            f'N:  Nitro \n'
            f'Temperature: \n')
msg=(
            f'Rainfall: \n\n'
            f'Predictionl\n'
            f'Your prediction request has been resolved.')
pdf.set_right_margin(10)
pdf.cell(40, 10,message)
pdf.cell(80,20,msg)
pdf.output(output_path)

reader = PdfReader(output_path)
writer = PdfWriter()
for page_num in range(len(reader.pages)):
    writer.add_page(reader.pages[page_num])

# password = "mahesh"
# writer.encrypt(password)

# with open(protected_output_path, "wb") as f:
#     writer.write(f)

# print(f"Password-protected PDF saved at: {protected_output_path}")



