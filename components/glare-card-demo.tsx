import GlareCard from "@/components/ui/glare-card";

import { Button } from "@/components/ui/moving-border"

export default function GlareCardDemo() {
    return (
        <GlareCard className="group flex flex-col  items-center justify-center w-60 h-16 transition-transform duration-200 hover:-translate-y-1  hover:scale-100 hover:shadow-lg">
            <a href="#experts" aria-label="Connect with our experts">
                <Button
                borderRadius="1.75rem"
                className="bg-orange-200 text-black dark:text-white border-neutral-200 dark:border-slate-800 transform transition-all duration-200 group-hover:scale-100 hover:bg-orange-500 hover:border-orange-500 hover:text-white group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white"
                >
                Connect with our experts
                </Button>
            </a>
        </GlareCard>
    );
}
