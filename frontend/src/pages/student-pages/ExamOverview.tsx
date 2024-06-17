import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/state/store";
import { User } from "@/types";
import { Link } from "react-router-dom";

const ExamOverview = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { registeredCourses } = user as User<"student">;

  return (
    <div className="flex flex-col items-center">
      {registeredCourses?.length === 0 ? (
        <p className="mb-4 font-semibold">No exams available</p>
      ) : (
        <div className="flex w-full flex-col gap-y-4">
          {registeredCourses?.map((course, i) => (
            <Card key={i} className="flex justify-between">
              <CardHeader className="flex justify-between p-3 sm:items-center gap-4 sm:flex-row w-full">
                <div>
                  <CardTitle className="text-base">
                    {course.toUpperCase()}
                  </CardTitle>
                </div>
                <Link to={"thisissupposedtobetheexamid"}>
                  <Button variant={"outline"}>Take Exam</Button>
                </Link>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamOverview;
