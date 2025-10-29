import pandas as pd
import sys

try:
    # Read Excel file
    excel_file = r'C:\Users\spder\Downloads\Pricing_4_ZoneRates.xlsx'

    # Get sheet names
    xls = pd.ExcelFile(excel_file)
    print('Sheet names:', xls.sheet_names)
    print()

    # Read first sheet
    df = pd.read_excel(excel_file)

    print('--- ALL DATA ---')
    print(df.to_string())
    print()

    print('--- Columns ---')
    print(df.columns.tolist())
    print()

    print('--- Shape ---')
    print(f'Rows: {df.shape[0]}, Columns: {df.shape[1]}')
    print()

    print('--- Data Types ---')
    print(df.dtypes)

except Exception as e:
    print(f'Error: {e}')
    sys.exit(1)
