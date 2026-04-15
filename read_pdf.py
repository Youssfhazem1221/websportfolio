import PyPDF2
reader = PyPDF2.PdfReader('CV3_UX_Designer.docx.pdf')
with open('cv_text.txt', 'w', encoding='utf-8') as f:
    for page in reader.pages:
        f.write(page.extract_text() + "\n")
