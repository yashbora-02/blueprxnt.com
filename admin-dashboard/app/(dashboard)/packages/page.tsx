'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, GripVertical, Star } from 'lucide-react';
import { PackageDialog } from '@/components/dialogs/PackageDialog';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortablePackageCard } from '@/components/dashboard/SortablePackageCard';

interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  recommended: boolean;
  active: boolean;
}

const initialPackages: Package[] = [
  {
    id: '1',
    name: 'Foundation',
    slug: 'foundation',
    description: 'Build your foundation with personalized coaching and systems.',
    price: '2997',
    duration: '12 weeks',
    features: [
      'Weekly 1-on-1 coaching calls',
      'Custom nutrition plan',
      'Training program design',
      'Habit tracking system',
      'Email support'
    ],
    ctaText: 'Apply Now',
    ctaLink: '/apply',
    recommended: false,
    active: true,
  },
  {
    id: '2',
    name: 'Performance',
    slug: 'performance',
    description: 'Advanced coaching for high performers ready to optimize everything.',
    price: '4997',
    duration: '16 weeks',
    features: [
      'Everything in Foundation',
      'Bi-weekly 1-on-1 coaching calls',
      'Advanced metabolic testing',
      'Recovery protocols',
      'Priority support',
      'Quarterly reviews'
    ],
    ctaText: 'Apply Now',
    ctaLink: '/apply',
    recommended: true,
    active: true,
  },
  {
    id: '3',
    name: 'Elite',
    slug: 'elite',
    description: 'The complete system. For those ready to operate at the highest level.',
    price: '9997',
    duration: '6 months',
    features: [
      'Everything in Performance',
      'Weekly 1-on-1 coaching calls',
      'Comprehensive lab work & analysis',
      'Custom supplementation protocol',
      '24/7 direct access',
      'Monthly in-person check-ins',
      'Lifetime access to resources'
    ],
    ctaText: 'Apply Now',
    ctaLink: '/apply',
    recommended: false,
    active: true,
  },
];

export default function PackagesPage() {
  const [packages, setPackages] = useState(initialPackages);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPackages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCreate = () => {
    setEditingPackage(null);
    setDialogOpen(true);
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const handleSave = (pkg: Package) => {
    if (editingPackage) {
      setPackages(packages.map(p => p.id === pkg.id ? pkg : p));
    } else {
      setPackages([...packages, { ...pkg, id: Date.now().toString() }]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coaching Packages"
        description="Manage your coaching packages. Drag to reorder, click to edit."
        action={
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Package
          </Button>
        }
      />

      <div className="grid gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={packages.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {packages.map((pkg) => (
              <SortablePackageCard
                key={pkg.id}
                package={pkg}
                onEdit={() => handleEdit(pkg)}
                onDelete={() => handleDelete(pkg.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {packages.length === 0 && (
        <Card className="bg-zinc-800 border-zinc-700 p-12 text-center">
          <div className="max-w-sm mx-auto space-y-4">
            <div className="w-16 h-16 bg-zinc-700 rounded-full flex items-center justify-center mx-auto">
              <Plus className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">No packages yet</h3>
            <p className="text-zinc-400">
              Create your first coaching package to get started.
            </p>
            <Button onClick={handleCreate}>Create Package</Button>
          </div>
        </Card>
      )}

      <PackageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        package={editingPackage}
        onSave={handleSave}
      />
    </div>
  );
}
