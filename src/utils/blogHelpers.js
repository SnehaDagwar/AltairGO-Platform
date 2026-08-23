import imgMeghalaya from '../assets/meghalaya-bridges.jpg';
import imgKashmir from '../assets/kashmir.jpg';
import imgAndaman from '../assets/andaman-islands.jpg';
import imgVaranasi from '../assets/journal_varanasi.png';
import imgLuxury from '../assets/luxury-resort.jpg';
import imgMunnar from '../assets/munnar-tea.jpg';
import imgJaipur from '../assets/jaipur-hawa.jpg';
import imgTrain from '../assets/journal_himachal.png';
import imgRishikesh from '../assets/rishikesh-yoga.jpg';

const BLOG_IMAGES = {
  'meghalaya-bridges.jpg': imgMeghalaya,
  'kashmir.jpg': imgKashmir,
  'andaman-islands.jpg': imgAndaman,
  'journal_varanasi.png': imgVaranasi,
  'luxury-resort.jpg': imgLuxury,
  'munnar-tea.jpg': imgMunnar,
  'jaipur-hawa.jpg': imgJaipur,
  'journal_himachal.png': imgTrain,
  'rishikesh-yoga.jpg': imgRishikesh,
};

export const resolveBlogImage = (imageName) => {
  if (!imageName) return imageName;
  if (imageName.startsWith('http://') || imageName.startsWith('https://')) return imageName;
  const filename = imageName.split('/').pop();
  return BLOG_IMAGES[filename] || imageName;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  if (/^[A-Za-z]{3}\s\d{1,2},\s\d{4}$/.test(dateStr.trim())) return dateStr;

  try {
    const match = dateStr.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      const [_, year, month, day] = match;
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    const parsed = Date.parse(dateStr);
    if (isNaN(parsed)) return dateStr;
    const date = new Date(parsed);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};
