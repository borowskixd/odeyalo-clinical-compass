import { Form } from "./components";
import kptDiaryImage from "@/client/assets/webp/pictures/kptDiaryImage.webp";
import { ImageContentLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const KptDiaryFormPage: FC = () => {
  return (
    <ImageContentLayout imageSrc={kptDiaryImage.src}>
      <Form />
    </ImageContentLayout>
  );
};
