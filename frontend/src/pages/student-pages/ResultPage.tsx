import ResultTable from "@/components/ResultTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { results } from "@/static/sample";

const ResultsPage = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {results.map((result, i) => (
        <AccordionItem key={i} value={result.title.toLowerCase()}>
          <AccordionTrigger className="!no-underline">
            <div className="flex flex-col gap-y-1 text-start">
              <p>{result.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                <span>Total Score: </span>
                <span>{result.totalScore}</span>
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ResultTable data={result.questions} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ResultsPage;
