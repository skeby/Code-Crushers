import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/state/store";
import { useEffect } from "react";

const ResultsPage = () => {
  const { user, refetchUser } = useAppSelector((state) => state.auth);
  useEffect(() => {
    refetchUser();
  }, []);
  console.log(user?.takenExams);
  return user?.takenExams && user?.takenExams?.length > 0 ? (
    <Accordion type="single" collapsible className="w-full">
      {user.takenExams.map((exam, i) => (
        <AccordionItem key={i} value={`${i}`}>
          <AccordionTrigger className="!no-underline">
            <div className="flex flex-col gap-y-1 text-start">
              <p>{exam.course.toUpperCase()}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                <span>Total Score: </span>
                <span>{exam.score}</span>
              </p>
              {exam.feedback && (
                <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                  <span>AI Feedback: </span>
                  <span>{exam.feedback}</span>
                </p>
              )}
            </div>
          </AccordionTrigger>
          {/* <AccordionContent> */}
          {/* <ResultTable data={results[0].questions} /> */}
          {/* </AccordionContent> */}
        </AccordionItem>
      ))}
    </Accordion>
  ) : (
    <Card>
      <CardHeader className="text-center">No Exam Results Available</CardHeader>
    </Card>
  );
};

export default ResultsPage;
