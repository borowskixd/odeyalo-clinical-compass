import { Header, Result } from "./components";
import kptDiaryImage from "@/client/assets/webp/pictures/kptDiaryImage.webp";
import { ImageContentLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const KptDiaryResultPage: FC = () => {
  return (
    <ImageContentLayout imageSrc={kptDiaryImage.src}>
      <Header />
      <Result />
    </ImageContentLayout>
  );
};
