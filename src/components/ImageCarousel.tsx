'use client';

import { JournalEntry } from '@/lib/airtable';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface ImageCarouselProps {
  entries: JournalEntry[];
  onEntrySelected: (entry: JournalEntry) => void;
}

export default function ImageCarousel({ entries, onEntrySelected }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    onEntrySelected(entries[index]);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi, entries, onEntrySelected]);

  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (entries.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No journal entries yet</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[min(600px,80vh)] mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {entries.map((entry, index) => (
            <div 
              key={entry.id} 
              className="flex-[0_0_100%] min-w-0 relative aspect-square"
            >
              <Image
                src={entry.image || '/placeholder-image.jpg'}
                alt={entry.title}
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                className="object-cover"
                priority={index === 0}
              />
              {/* Subtle gradient overlay for better visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Dots navigation */}
      <div className="flex justify-center gap-2 mt-2">
        {entries.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-foreground' : 'bg-foreground/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
} 