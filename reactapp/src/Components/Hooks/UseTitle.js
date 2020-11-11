import { useEffect } from 'reaect';

export const useTitle => openItem => {
  useEffect(() => {
    document.title = openItem ? openItem.name : `MRDonald's`;
  })
}