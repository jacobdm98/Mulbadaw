import { useEffect, useState } from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { TypedObject } from '@portabletext/types';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

const storagePrefix = 'mulbadaw-preview:';
const imageBuilder = createImageUrlBuilder({ projectId: 'tyk7mbom', dataset: 'production' });

interface PreviewSnapshot {
  type: string;
  document: Record<string, unknown>;
  expiresAt: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isPreviewSnapshot = (value: unknown): value is PreviewSnapshot =>
  isRecord(value) &&
  typeof value.type === 'string' &&
  isRecord(value.document) &&
  typeof value.expiresAt === 'number';

function localized(value: unknown, language: 'en' | 'sw'): string {
  if (typeof value === 'string') return value;
  if (!isRecord(value)) return '';
  const selected = value[language];
  const fallback = value.en;
  return typeof selected === 'string' ? selected : typeof fallback === 'string' ? fallback : '';
}

function imageUrl(value: unknown, width = 1200): string {
  if (!isRecord(value)) return '';
  const asset = value.asset;
  if (
    !isRecord(asset) ||
    (typeof asset._ref !== 'string' && typeof asset.url !== 'string')
  ) {
    return '';
  }

  return imageBuilder.image(value as SanityImageSource).width(width).url();
}

function portableText(value: unknown): TypedObject[] {
  return Array.isArray(value)
    ? value.filter((block): block is TypedObject => isRecord(block) && typeof block._type === 'string')
    : [];
}

function safeHref(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  return /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i.test(value) ? value : null;
}

function fileUrl(value: unknown): string {
  if (!isRecord(value) || !isRecord(value.asset) || typeof value.asset._ref !== 'string') return '';
  const match = /^file-([^-]+)-([a-z0-9]+)$/i.exec(value.asset._ref);
  return match
    ? `https://cdn.sanity.io/files/tyk7mbom/production/${match[1]}.${match[2]}`
    : '';
}

function portableTextComponents(language: 'en' | 'sw'): PortableTextComponents {
  const caption = (node: Record<string, unknown>) =>
    language === 'sw' ? node.captionSw || node.captionEn : node.captionEn || node.captionSw;

  return {
    marks: {
      link: ({ children, value }) => {
        const href = safeHref(isRecord(value) ? value.href : null);
        return href ? <a href={href}>{children}</a> : <>{children}</>;
      },
    },
    types: {
      imageBlock: ({ value }) => {
        const node = value as Record<string, unknown>;
        const src = imageUrl(node.image);
        const imageCaption = caption(node);
        return src ? (
          <figure className="my-6">
            <img src={src} alt={typeof imageCaption === 'string' ? imageCaption : ''} className="w-full rounded-lg" />
            {typeof imageCaption === 'string' && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">{imageCaption}</figcaption>
            )}
          </figure>
        ) : null;
      },
      imageGalleryBlock: ({ value }) => {
        const node = value as Record<string, unknown>;
        const images = Array.isArray(node.images) ? node.images.filter(isRecord) : [];
        return (
          <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {images.map((item, index) => {
              const src = imageUrl(item.image, 900);
              const imageCaption = caption(item);
              return src ? (
                <figure key={index}>
                  <img
                    src={src}
                    alt={typeof imageCaption === 'string' ? imageCaption : ''}
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                  {typeof imageCaption === 'string' && (
                    <figcaption className="mt-2 text-center text-sm text-gray-500">{imageCaption}</figcaption>
                  )}
                </figure>
              ) : null;
            })}
          </div>
        );
      },
      videoBlock: ({ value }) => {
        const node = value as Record<string, unknown>;
        const src = fileUrl(node.videoFile);
        const videoCaption = caption(node);
        return src ? (
          <figure className="my-6">
            <video src={src} controls className="w-full rounded-lg" />
            {typeof videoCaption === 'string' && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">{videoCaption}</figcaption>
            )}
          </figure>
        ) : null;
      },
    },
  };
}

function RichContent({ value, language }: { value: unknown; language: 'en' | 'sw' }) {
  return <PortableText value={portableText(value)} components={portableTextComponents(language)} />;
}

function PreviewContent({
  snapshot,
  language,
}: {
  snapshot: PreviewSnapshot;
  language: 'en' | 'sw';
}) {
  const { document, type } = snapshot;
  const title = localized(document.title, language) || 'Untitled';
  const mainImage = imageUrl(document.mainImage);

  if (type === 'article') {
    const body = isRecord(document.body) ? document.body[language] || document.body.en : [];
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        {mainImage && (
          <img src={mainImage} alt="" className="mb-8 h-80 w-full rounded-lg object-cover shadow-sm" />
        )}
        <div className="prose max-w-none space-y-6">
          <RichContent value={body} language={language} />
        </div>
      </main>
    );
  }

  if (type === 'project') {
    const content = isRecord(document.content) ? document.content[language] || document.content.en : [];
    const description = localized(document.description, language);
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        {description && <p className="mb-8 text-xl text-gray-600">{description}</p>}
        {mainImage && (
          <img src={mainImage} alt={title} className="mb-8 h-80 w-full rounded-lg object-cover" />
        )}
        <div className="prose max-w-none">
          <RichContent value={content} language={language} />
        </div>
      </main>
    );
  }

  if (type === 'gallery') {
    const photos = Array.isArray(document.photos) ? document.photos.filter(isRecord) : [];
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold">
          {language === 'sw' ? 'Maktaba Yetu ya Picha' : 'Our Photo Gallery'}
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {photos.map((photo, index) => {
            const src = imageUrl(photo.image, 600);
            const caption = localized(photo.caption, language);
            const video = fileUrl(photo.videoFile);
            return (
              <figure key={index} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                {video ? (
                  <video src={video} controls className="h-60 w-full object-cover" />
                ) : (
                  src && (
                    <img
                      src={src}
                      alt={typeof photo.alt === 'string' ? photo.alt : caption}
                      className="h-60 w-full object-cover"
                    />
                  )
                )}
                {caption && <figcaption className="p-4 text-sm text-gray-600">{caption}</figcaption>}
              </figure>
            );
          })}
        </div>
      </main>
    );
  }

  if (type === 'contactPage') {
    const details = isRecord(document.details) ? document.details : {};
    const employees = Array.isArray(document.employees) ? document.employees.filter(isRecord) : [];
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-6 text-4xl font-bold">{title}</h1>
        {localized(document.intro, language) && (
          <p className="mb-10 max-w-3xl text-lg text-gray-600">{localized(document.intro, language)}</p>
        )}
        <section className="mb-12 rounded-2xl bg-emerald-800 p-8 text-white shadow-lg">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
            {localized(details.label, language)}
          </p>
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="mt-6 grid gap-3 text-emerald-50 sm:grid-cols-3">
            {localized(details.email, language) && <span>{localized(details.email, language)}</span>}
            {localized(details.phone, language) && <span>{localized(details.phone, language)}</span>}
            {localized(details.address, language) && <span>{localized(details.address, language)}</span>}
          </div>
        </section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {employees.map((employee, index) => {
            const name = localized(employee.name, language);
            const photo = imageUrl(employee.photo, 600);
            return (
              <article key={index} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                {photo ? (
                  <img src={photo} alt={name} className="h-64 w-full object-cover" />
                ) : (
                  <div className="h-64 bg-emerald-100" />
                )}
                <div className="p-6">
                  {name && <h3 className="text-xl font-bold">{name}</h3>}
                  {localized(employee.role, language) && (
                    <p className="mt-1 text-emerald-700">{localized(employee.role, language)}</p>
                  )}
                  <div className="mt-5 space-y-2 text-sm text-gray-600">
                    {localized(employee.email, language) && <p>{localized(employee.email, language)}</p>}
                    {localized(employee.phone, language) && <p>{localized(employee.phone, language)}</p>}
                    {localized(employee.address, language) && <p>{localized(employee.address, language)}</p>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    );
  }

  const content = isRecord(document.content) ? document.content[language] || document.content.en : [];
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">{title}</h1>
      <div className="prose prose-lg max-w-none">
        <RichContent value={content} language={language} />
      </div>
    </main>
  );
}

export default function StudioPreview() {
  const [snapshot, setSnapshot] = useState<PreviewSnapshot | null>(null);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const previewId = new URLSearchParams(window.location.search).get('key');
    if (!previewId || !/^[0-9a-f-]{36}$/i.test(previewId)) {
      setError('This preview link is invalid. Open Preview again from the document in Sanity Studio.');
      return;
    }

    const storageKey = `${storagePrefix}${previewId}`;
    const rawSnapshot = localStorage.getItem(storageKey);
    if (!rawSnapshot) {
      setError('This preview has expired or was opened in a different browser. Open Preview again from Sanity Studio.');
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawSnapshot);
    } catch {
      localStorage.removeItem(storageKey);
      setError('The saved preview data is invalid. Open Preview again from Sanity Studio.');
      return;
    }

    if (!isPreviewSnapshot(parsed)) {
      localStorage.removeItem(storageKey);
      setError('The saved preview data is invalid. Open Preview again from Sanity Studio.');
      return;
    }

    if (parsed.expiresAt <= Date.now()) {
      localStorage.removeItem(storageKey);
      setError('This preview has expired. Open Preview again from Sanity Studio.');
      return;
    }

    setSnapshot(parsed);
    window.setTimeout(() => localStorage.removeItem(storageKey), parsed.expiresAt - Date.now());
  }, []);

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-300 bg-amber-50 px-4 py-3 text-sm">
        <p className="font-semibold text-amber-950">Draft preview — not published</p>
        {snapshot && (
          <div className="flex gap-2" aria-label="Preview language">
            {(['en', 'sw'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={language === option}
                onClick={() => setLanguage(option)}
                className={`rounded px-3 py-1 font-medium ${
                  language === option ? 'bg-emerald-700 text-white' : 'bg-white text-gray-700'
                }`}
              >
                {option === 'en' ? 'English' : 'Kiswahili'}
              </button>
            ))}
          </div>
        )}
      </header>
      {error ? (
        <p role="alert" className="mx-auto max-w-2xl px-4 py-16 text-center text-gray-700">
          {error}
        </p>
      ) : snapshot ? (
        <PreviewContent snapshot={snapshot} language={language} />
      ) : (
        <p className="px-4 py-16 text-center text-gray-500">Loading preview…</p>
      )}
    </div>
  );
}
