"use client";

import { useState } from "react";

/**
 * Cloudflare Stream walkaround.
 *
 * The feed stores a /watch link; the embeddable player and the poster frame
 * are sibling paths on the same customer subdomain. Click-to-play rather than
 * an always-mounted iframe — the player is a few hundred KB and this sits
 * mid-page, so it shouldn't load for people who never press it.
 */
export function streamUrls(videoUrl: string): { iframe: string; poster: string } | null {
  const m = videoUrl.match(
    /^(https:\/\/customer-[a-z0-9]+\.cloudflarestream\.com)\/([a-z0-9]+)\/(?:watch|iframe)/i
  );
  if (!m) return null;
  const [, host, id] = m;
  return {
    iframe: `${host}/${id}/iframe?preload=metadata`,
    poster: `${host}/${id}/thumbnails/thumbnail.jpg?time=2s&height=720`,
  };
}

export default function Walkaround({ videoUrl, label }: { videoUrl: string; label: string }) {
  const [playing, setPlaying] = useState(false);
  const urls = streamUrls(videoUrl);
  if (!urls) return null;

  if (playing) {
    return (
      <div className="video">
        <iframe
          src={`${urls.iframe}&autoplay=true`}
          title={`${label} walkaround`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="video poster">
      {/* Plain <img>: the Cloudflare Stream host isn't in next.config's
          remotePatterns, and next.config is a shared live file this preview
          shouldn't be editing. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={urls.poster} alt={`${label} walkaround`} loading="lazy" />
      <button className="play" aria-label={`Play ${label} walkaround`} onClick={() => setPlaying(true)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className="cap">Walkaround · Cloudflare Stream</div>
    </div>
  );
}
