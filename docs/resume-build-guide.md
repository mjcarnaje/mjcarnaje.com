# Resume Build Guide

This guide explains how to compile the LaTeX resume (`Carnaje - Resume.tex`) into a PDF.

## Prerequisites

### 1. Install BasicTeX

BasicTeX is a lightweight LaTeX distribution for macOS:

```bash
brew install --cask basictex
```

### 2. Update PATH

After installation, update your shell's PATH to include LaTeX binaries:

```bash
eval "$(/usr/libexec/path_helper)"
```

Add this line to your `~/.zshrc` or `~/.bashrc` to make it permanent:

```bash
echo 'eval "$(/usr/libexec/path_helper)"' >> ~/.zshrc
```

### 3. Update tlmgr

Before installing packages, update the TeX Live Manager:

```bash
sudo tlmgr update --self
```

### 4. Install Required LaTeX Packages

Install all the packages required by the resume template:

```bash
sudo tlmgr install preprint titlesec marvosym enumitem fancyhdr helvetic
```

Package descriptions:
- `preprint`: Includes the `fullpage` package for margin control
- `titlesec`: Custom section title formatting
- `marvosym`: Symbol fonts (e.g., for email, phone icons)
- `enumitem`: Custom list formatting
- `fancyhdr`: Custom headers and footers
- `helvetic`: Helvetica font family

## Compiling the Resume

### Basic Compilation

To compile the resume to PDF:

```bash
pdflatex "Carnaje - Resume.tex"
```

This will generate:
- `Carnaje - Resume.pdf` (the final PDF)
- `Carnaje - Resume.aux` (auxiliary file)
- `Carnaje - Resume.log` (compilation log)

### Clean Compilation

For a clean build, you may want to remove auxiliary files first:

```bash
rm -f "Carnaje - Resume.aux" "Carnaje - Resume.log"
pdflatex "Carnaje - Resume.tex"
```

## Troubleshooting

### Missing Package Error

If you get an error like `File 'packagename.sty' not found`, install the missing package:

```bash
sudo tlmgr install packagename
```

### Permission Denied

If tlmgr commands fail with permission errors, ensure you're using `sudo`:

```bash
sudo tlmgr install packagename
```

### pdflatex Command Not Found

If `pdflatex` is not found after installation:

1. Run the path helper:
   ```bash
   eval "$(/usr/libexec/path_helper)"
   ```

2. Verify the installation:
   ```bash
   which pdflatex
   ```

3. If still not found, try reinstalling BasicTeX

## Notes

- The resume uses standard LaTeX article class with custom formatting
- All fonts and packages are included in the BasicTeX distribution after installing the required packages
- The PDF is optimized for ATS (Applicant Tracking System) parsing with `\pdfgentounicode=1`
