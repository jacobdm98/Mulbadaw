import type { DocumentActionComponent } from 'sanity';

const previewableTypes = new Set([
  'aboutPage',
  'historyPage',
  'contactPage',
  'gallery',
  'article',
  'project',
]);
const storagePrefix = 'mulbadaw-preview:';

export const previewAction: DocumentActionComponent = (props) => {
  if (!previewableTypes.has(props.type) || !props.ready) return null;

  const document = props.draft ?? props.published;
  if (!document) return null;

  return {
    label: 'Preview',
    title: 'Preview this document on the website',
    onHandle: () => {
      const previewId = crypto.randomUUID();
      const storageKey = `${storagePrefix}${previewId}`;
      const expiresAt = Date.now() + 30 * 60 * 1000;

      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            type: props.type,
            document,
            expiresAt,
          }),
        );

        const previewWindow = window.open(`/preview?key=${previewId}`, '_blank');
        if (!previewWindow) {
          localStorage.removeItem(storageKey);
          window.alert('The preview could not open. Allow pop-ups for this site and try again.');
          return;
        }

        previewWindow.opener = null;
        window.setTimeout(() => localStorage.removeItem(storageKey), expiresAt - Date.now());
        props.onComplete();
      } catch (error) {
        console.error('Unable to store the Sanity draft for preview.', error);
        window.alert('The preview could not be prepared. Please try again.');
      }
    },
  };
};
