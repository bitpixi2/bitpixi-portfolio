import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import meituImg from '@/assets/work/meitu-features.png';
import gfycatImg from '@/assets/work/gfycat-hero.png';
import voxelsImg from '@/assets/work/voxels.jpeg';

const caseStudies = [
  { path: '/work/meitu', title: 'Meitu', role: 'UX Designer', img: meituImg },
  { path: '/work/gfycat', title: 'Gfycat / Snap', role: 'Senior Product Designer', img: gfycatImg },
  { path: '/work/virtual-worlds', title: 'Voxels', role: 'Product Designer', img: voxelsImg },
];

interface CaseStudyNavProps {
  currentPath: string;
}

const CaseStudyNav = ({ currentPath }: CaseStudyNavProps) => {
  const currentIndex = caseStudies.findIndex(s => s.path === currentPath);
  const prev = caseStudies[(currentIndex - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div className="mt-24">
      <div className="grid grid-cols-2 gap-8">
        <Link to={prev.path} className="group flex items-center gap-5">
          <ChevronLeft className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="aspect-[16/9] border border-border overflow-hidden mb-3 max-w-[240px]">
              <img
                src={prev.img}
                alt={prev.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <p className="font-serif text-lg font-semibold text-foreground">{prev.title}</p>
            <p className="mono-label text-xs">{prev.role}</p>
          </div>
        </Link>
        <Link to={next.path} className="group flex items-center gap-5 justify-end text-right">
          <div className="flex-1 min-w-0 flex flex-col items-end">
            <div className="aspect-[16/9] border border-border overflow-hidden mb-3 max-w-[240px]">
              <img
                src={next.img}
                alt={next.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <p className="font-serif text-lg font-semibold text-foreground">{next.title}</p>
            <p className="mono-label text-xs">{next.role}</p>
          </div>
          <ChevronRight className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </Link>
      </div>
    </div>
  );
};

export default CaseStudyNav;
