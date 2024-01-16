"use client";

// import { create } from "@/actions/create-board";

import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board/index";

const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "Success");
    },
    onError: (error) => {
      console.log(error, "Error");
    },
  });
  // const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(create, initialState);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title");
    if (!title) return;
    execute({ title: title as string });
  };

  return (
    <form action={onSubmit}>
      <div className=" flex flex-col space-y-2">
        <FormInput label="Board Title" id={"title"} errors={fieldErrors} />
      </div>
      <FormSubmit>save</FormSubmit>
    </form>
  );
};

export default Form;
