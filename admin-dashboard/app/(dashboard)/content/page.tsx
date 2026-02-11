'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroEditor } from '@/components/editors/HeroEditor';
import { AboutEditor } from '@/components/editors/AboutEditor';
import { CoachingEditor } from '@/components/editors/CoachingEditor';
import { FooterEditor } from '@/components/editors/FooterEditor';
import { TestimonialsEditor } from '@/components/editors/TestimonialsEditor';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Eye, Save, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Changes saved',
        description: 'Your content has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save changes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!confirm('Are you sure you want to publish these changes to the live website?')) {
      return;
    }

    setIsSaving(true);
    try {
      // Simulate publishing
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: 'Published!',
        description: 'Your changes are now live on the website.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to publish changes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Content"
        description="Edit all website content from one place. Changes can be previewed before publishing."
      />

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-zinc-800 border border-zinc-700 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-sm text-zinc-400">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <span>Unsaved changes</span>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button size="sm" onClick={handlePublish} disabled={isSaving}>
            <Globe className="w-4 h-4 mr-2" />
            Publish Live
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-zinc-800 p-1">
          <TabsTrigger value="hero">Homepage Hero</TabsTrigger>
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="coaching">Coaching</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-6">
          <HeroEditor />
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <AboutEditor />
        </TabsContent>

        <TabsContent value="coaching" className="space-y-6">
          <CoachingEditor />
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <TestimonialsEditor />
        </TabsContent>

        <TabsContent value="footer" className="space-y-6">
          <FooterEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
