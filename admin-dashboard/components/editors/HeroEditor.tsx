'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

export function HeroEditor() {
  const [heroData, setHeroData] = useState({
    label: 'BLUEPRXNT PERFORMANCE HEALTH',
    title: "The World's First Performance<br>Health Operating System",
    subtitle: 'Built in elite sport. Engineered for real life. Now available to you.',
    gradientText: 'Transform your health into lasting performance.',
    ctaPrimary: {
      text: 'Apply for Coaching',
      link: '/apply'
    },
    ctaSecondary: {
      text: 'Explore the System',
      link: '/system'
    },
    bottomText: 'No quick fixes. No generic plans. Just a system you can run.',
    backgroundImage: null,
  });

  const handleUpdate = (field: string, value: any) => {
    setHeroData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedUpdate = (parent: string, field: string, value: any) => {
    setHeroData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as any),
        [field]: value
      }
    }));
  };

  return (
    <Card className="bg-zinc-800 border-zinc-700 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">Homepage Hero Section</h3>
        <p className="text-sm text-zinc-400">
          Edit the main hero section that visitors see when they land on your homepage.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Text Content */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="hero-label" className="text-zinc-300">Top Label</Label>
            <Input
              id="hero-label"
              value={heroData.label}
              onChange={(e) => handleUpdate('label', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white mt-1.5"
              placeholder="BLUEPRXNT PERFORMANCE HEALTH"
            />
            <p className="text-xs text-zinc-500 mt-1">Small text above the main headline</p>
          </div>

          <div>
            <Label htmlFor="hero-title" className="text-zinc-300">Main Headline</Label>
            <Textarea
              id="hero-title"
              value={heroData.title}
              onChange={(e) => handleUpdate('title', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white mt-1.5 min-h-[100px]"
              placeholder="The World's First Performance Health Operating System"
            />
            <p className="text-xs text-zinc-500 mt-1">Use &lt;br&gt; for line breaks</p>
          </div>

          <div>
            <Label htmlFor="hero-subtitle" className="text-zinc-300">Subtitle</Label>
            <Textarea
              id="hero-subtitle"
              value={heroData.subtitle}
              onChange={(e) => handleUpdate('subtitle', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white mt-1.5"
              placeholder="Built in elite sport. Engineered for real life."
            />
          </div>

          <div>
            <Label htmlFor="hero-gradient" className="text-zinc-300">Gradient Text</Label>
            <Input
              id="hero-gradient"
              value={heroData.gradientText}
              onChange={(e) => handleUpdate('gradientText', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white mt-1.5"
              placeholder="Transform your health into lasting performance."
            />
            <p className="text-xs text-zinc-500 mt-1">This text appears with gradient styling</p>
          </div>

          <div>
            <Label htmlFor="hero-bottom" className="text-zinc-300">Bottom Text</Label>
            <Input
              id="hero-bottom"
              value={heroData.bottomText}
              onChange={(e) => handleUpdate('bottomText', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white mt-1.5"
              placeholder="No quick fixes. No generic plans."
            />
          </div>
        </div>

        {/* Right Column - CTAs & Images */}
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-zinc-300">Primary CTA Button</Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={heroData.ctaPrimary.text}
                onChange={(e) => handleNestedUpdate('ctaPrimary', 'text', e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-white"
                placeholder="Button Text"
              />
              <Input
                value={heroData.ctaPrimary.link}
                onChange={(e) => handleNestedUpdate('ctaPrimary', 'link', e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-white"
                placeholder="/apply"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-zinc-300">Secondary CTA Button</Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={heroData.ctaSecondary.text}
                onChange={(e) => handleNestedUpdate('ctaSecondary', 'text', e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-white"
                placeholder="Button Text"
              />
              <Input
                value={heroData.ctaSecondary.link}
                onChange={(e) => handleNestedUpdate('ctaSecondary', 'link', e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-white"
                placeholder="/system"
              />
            </div>
          </div>

          <div>
            <Label className="text-zinc-300 mb-3 block">Background Image</Label>
            <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center hover:border-zinc-600 transition-colors cursor-pointer">
              {heroData.backgroundImage ? (
                <div className="relative">
                  <Image
                    src={heroData.backgroundImage}
                    alt="Hero background"
                    width={400}
                    height={200}
                    className="rounded-lg mx-auto"
                  />
                  <button
                    onClick={() => handleUpdate('backgroundImage', null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-zinc-500" />
                  <p className="text-sm text-zinc-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-zinc-500">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="border-t border-zinc-700 pt-6">
        <Label className="text-zinc-300 mb-3 block">Live Preview</Label>
        <div className="bg-zinc-950 rounded-lg p-8 text-center space-y-4">
          <p className="text-xs font-bold tracking-wider text-sky-400">{heroData.label}</p>
          <h1
            className="text-4xl font-bold text-white"
            dangerouslySetInnerHTML={{ __html: heroData.title }}
          />
          <p className="text-zinc-400 text-lg">{heroData.subtitle}</p>
          <p className="text-2xl font-semibold bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
            {heroData.gradientText}
          </p>
          <div className="flex justify-center space-x-4 pt-4">
            <button className="px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold">
              {heroData.ctaPrimary.text}
            </button>
            <button className="px-6 py-3 border border-zinc-700 text-white rounded-lg font-semibold">
              {heroData.ctaSecondary.text}
            </button>
          </div>
          <p className="text-sm text-zinc-500 pt-4">{heroData.bottomText}</p>
        </div>
      </div>
    </Card>
  );
}
