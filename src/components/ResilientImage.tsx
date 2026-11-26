import { useState } from 'react';
import { Coffee, Croissant } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  fallbackIcon?: 'bakery' | 'coffee';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  fallbackIcon = 'bakery',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFECE6] via-[#E5DFD5] to-[#DCD4C6] text-[#4A4139] p-6 text-center ${className}`}
      >
        {fallbackIcon === 'coffee' ? (
          <Coffee className="w-8 h-8 mb-2 text-[#2C4A3E]" strokeWidth={1.5} />
        ) : (
          <Croissant className="w-8 h-8 mb-2 text-[#2C4A3E]" strokeWidth={1.5} />
        )}
        <span className="font-serif text-base font-medium text-[#1B1714]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
