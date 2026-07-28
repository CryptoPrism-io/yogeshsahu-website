export interface InvestorRecord {
  id: string;
  name: string;
  firm: string;
  role: string;
  location: string;
  type: string;
  score: number;
  linkedin?: string;
  email?: string;
  website?: string;
  tags: string[];
  description?: string;
  cheque?: string;
  stage?: string;
}

/**
 * Escapes CSV field value properly according to RFC 4180
 */
function escapeCSVCell(val: string | number | undefined): string {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * Download dataset as a CSV file
 */
export function downloadCSV(data: InvestorRecord[], filename = 'investors-directory.csv') {
  if (!data || data.length === 0) return;

  const headers = ['Name', 'Firm / Organization', 'Role / Focus', 'Type', 'Location', 'Cheque', 'Stage', 'Email', 'LinkedIn', 'Website', 'Tags', 'Score'];
  
  const rows = data.map(item => [
    escapeCSVCell(item.name),
    escapeCSVCell(item.firm),
    escapeCSVCell(item.role),
    escapeCSVCell(item.type),
    escapeCSVCell(item.location),
    escapeCSVCell(item.cheque),
    escapeCSVCell(item.stage),
    escapeCSVCell(item.email),
    escapeCSVCell(item.linkedin),
    escapeCSVCell(item.website),
    escapeCSVCell(item.tags.join(', ')),
    escapeCSVCell(item.score)
  ].join(','));

  const csvContent = '\uFEFF' + [headers.map(h => escapeCSVCell(h)).join(','), ...rows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download dataset as an Excel-compatible XML spreadsheet (.xls / .xlsx)
 */
export function downloadExcel(data: InvestorRecord[], filename = 'investors-directory.xls') {
  if (!data || data.length === 0) return;

  const headers = ['Name', 'Firm / Organization', 'Role / Focus', 'Type', 'Location', 'Cheque', 'Stage', 'Email', 'LinkedIn', 'Website', 'Tags', 'Score'];

  let tableHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Global Investors Pool</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
      <style>
        th { background-color: #1e293b; color: #ffffff; font-weight: bold; padding: 10px; border: 1px solid #334155; }
        td { padding: 8px; border: 1px solid #cbd5e1; }
        tr:nth-child(even) { background-color: #f8fafc; }
      </style>
    </head>
    <body>
      <table>
        <thead>
          <tr>
            ${headers.map(h => `<th>${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
  `;

  data.forEach(item => {
    tableHtml += `
      <tr>
        <td>${escapeXml(item.name)}</td>
        <td>${escapeXml(item.firm)}</td>
        <td>${escapeXml(item.role)}</td>
        <td>${escapeXml(item.type)}</td>
        <td>${escapeXml(item.location)}</td>
        <td>${escapeXml(item.cheque || '')}</td>
        <td>${escapeXml(item.stage || '')}</td>
        <td>${escapeXml(item.email || '')}</td>
        <td>${escapeXml(item.linkedin || '')}</td>
        <td>${escapeXml(item.website || '')}</td>
        <td>${escapeXml(item.tags.join(', '))}</td>
        <td>${item.score}</td>
      </tr>
    `;
  });

  tableHtml += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeXml(unsafe: string | number | undefined): string {
  if (unsafe === undefined || unsafe === null) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
