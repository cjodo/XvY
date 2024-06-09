import { ChartData } from "~/types";
import { aggregateRepoLanguages } from "~/app/_services/getLanguageStats";
import { Title } from "../../Title/Title";
import { LanguageBar } from "./LanguageBar";

interface LanguagesProps {
  data: ChartData[];
  user: string;
  token: string;
}
export const Languages = async ({ data, user, token }: LanguagesProps) => {
  let aggregatedLanguages;

  try {
    // aggregatedLanguages = await aggregateRepoLanguages(data, user, token);
  } catch (error) {
    console.error("Failed to aggregate language stats: ", error);
  }

  return (
    aggregatedLanguages && (
      <>
        <Title>
          <div className="mx-4 my-2 rounded bg-[#eeeeee33]">Languages: </div>
        </Title>
        <LanguageBar languages={aggregatedLanguages} />
      </>
    )
  );
};
