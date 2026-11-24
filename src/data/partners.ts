// Companies shown in the home-page logo marquee. Logo files live in
// /public/images/partners and were taken from each company's Wikimedia
// Commons / Wikidata entry. `h` nudges the rendered height so wide wordmarks
// and tall emblems look about the same visual size.
export interface Partner {
  name: string;
  logo: string;
  h?: string;
}

const p = (name: string, file: string, h?: string): Partner => ({ name, logo: `/images/partners/${file}`, h });

const all: Partner[] = [
  p('IBM', 'ibm.svg', 'h-12'),
  p('Cipla', 'cipla.svg', 'h-10'),
  p('Merck', 'merck.svg'),
  p('Microsoft', 'microsoft.svg', 'h-9'),
  p('Accenture', 'accenture.svg', 'h-11'),
  p('LTIMindtree', 'ltimindtree.svg', 'h-7'),
  p('Wipro', 'wipro.svg', 'h-14'),
  p('Tata Consultancy Services', 'tcs.svg', 'h-9'),
  p('Infosys', 'infosys.svg', 'h-10'),
  p('HCLTech', 'hcltech.svg', 'h-8'),
  p('Capgemini', 'capgemini.svg', 'h-8'),
  p('Cognizant', 'cognizant.svg', 'h-8'),
  p('Mphasis', 'mphasis.png', 'h-11'),
  p('Persistent Systems', 'persistent.svg', 'h-8'),
  p('Oracle', 'oracle.svg', 'h-6'),
  p('SAP', 'sap.svg', 'h-12'),
  p('Salesforce', 'salesforce.svg', 'h-14'),
  p('ServiceNow', 'servicenow.svg', 'h-6'),
  p('Amazon', 'amazon.svg', 'h-10'),
  p('Google', 'google.svg', 'h-9'),
  p('Meta', 'meta.svg', 'h-9'),
  p('Adobe', 'adobe.svg', 'h-9'),
  p('Atlassian', 'atlassian.svg', 'h-6'),
  p('Cisco', 'cisco.svg', 'h-12'),
  p('Intel', 'intel.svg', 'h-12'),
  p('Nvidia', 'nvidia.svg', 'h-8'),
  p('Qualcomm', 'qualcomm.svg', 'h-7'),
  p('Samsung', 'samsung.svg', 'h-6'),
  p('Dell', 'dell.svg', 'h-12'),
  p('Hewlett Packard Enterprise', 'hpe.svg', 'h-9'),
  p('Siemens', 'siemens.svg', 'h-7'),
  p('Honeywell', 'honeywell.svg', 'h-7'),
  p('Uber', 'uber.svg', 'h-9'),
  p('Swiggy', 'swiggy.webp', 'h-10'),
  p('Zomato', 'zomato.png', 'h-12'),
  p('Zoho', 'zoho.svg', 'h-12'),
  p('Deloitte', 'deloitte.svg', 'h-8'),
  p('PwC', 'pwc.svg', 'h-12'),
  p('KPMG', 'kpmg.svg', 'h-10'),
  p('HSBC', 'hsbc.svg', 'h-9'),
  p('Goldman Sachs', 'goldmansachs.svg', 'h-12'),
  p('JPMorgan Chase', 'jpmorgan.svg', 'h-6'),
  p('Barclays', 'barclays.svg', 'h-7'),
  p('American Express', 'amex.svg', 'h-12'),
  p('Visa', 'visa.svg', 'h-9'),
  p('Mastercard', 'mastercard.svg', 'h-12'),
  p('ICICI Bank', 'icici.svg', 'h-8'),
  p('PhonePe', 'phonepe.svg', 'h-9'),
  p('Zerodha', 'zerodha.svg', 'h-7'),
  p('Walmart', 'walmart.svg', 'h-8'),
  p('Tech Mahindra', 'techmahindra.svg', 'h-11'),
  p('ITC Limited', 'itc.svg', 'h-16'),
  p('PharmEasy', 'pharmeasy.png', 'h-7'),
];

// Split into two rows of (almost) equal length for the marquee.
const half = Math.ceil(all.length / 2);
export const partnerRows: Partner[][] = [all.slice(0, half), all.slice(half)];
