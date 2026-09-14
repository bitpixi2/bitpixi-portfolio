import { PageLayout } from '@/components/PageLayout';
import CaseStudyNav from '@/components/CaseStudyNav';
import meituFeaturesImg from '@/assets/work/meitu-features.png';

const CaseStudyMeitu = () => {
  return (
    <PageLayout backTo="/work" backLabel="Back to Work">
      <span className="section-label block mb-4">Case Study</span>
      <h1 className="headline-section mb-4">Meitu</h1>
      <p className="mono-label mb-12">UX Designer · Mar–Jul 2017</p>

      <div className="border border-border mb-12 overflow-hidden">
        <img src={meituFeaturesImg} alt="Meitu platform features" className="w-full h-auto object-contain" />
      </div>

      <div className="max-w-[720px] mx-auto space-y-6 body-text">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Overview</h2>
        <p className="mono-label">UX Designer</p>
        <p>
          UX Designer at{' '}
          <a href="https://www.meitu.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Meitu</a>,
          a Chinese tech company with 450M+ monthly active users across 23 apps. Worked across
          multiple teams spanning the Palo Alto, LA, and Xiamen offices in a series of extreme
          sprints, primarily under Creative Director Evelyn Sun, with all teams reporting to CEO Frank Fu.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-foreground pt-4">Key Outcomes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Co-designed AR try-on for Makeup+ that became the #1 earning feature across all 23 apps</li>
          <li>Trained the Xiamen engineering team on global UX research methods, including qualitative usability testing and quantitative analysis frameworks</li>
          <li>Identified that ML models required retraining for diverse eye shapes and skin tones to perform accurately across global markets</li>
        </ul>

        <h2 className="font-serif text-2xl font-semibold text-foreground pt-4">Approach</h2>
        <p>
          Conducted cross-market research that revealed fundamentally different user motivations
          by region. Western users gravitated toward entertainment filters and features that
          enhanced maturity and angular facial structure, while Eastern users preferred
          status-signaling filters and features that emphasised youthfulness and softer facial
          contours. Preferred styles, filter choices, and purchase motivations all diverged by
          market. Used these insights to reduce friction in the purchase journey.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-foreground pt-4">Impact</h2>
        <p>
          The research reframed how the company approached localisation, shifting from
          surface-level translation to structurally different product strategies per region,
          including for the marketing teams. The AR commerce feature unlocked global purchasing
          power and became the top revenue driver across Meitu's entire app portfolio.
        </p>
      </div>

      <CaseStudyNav currentPath="/work/meitu" />
    </PageLayout>
  );
};

export default CaseStudyMeitu;
