import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FormUpload() {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [file, setFile] = useState<Blob | null>();

  return (
    <div className="flex flex-col max-w-md mx-auto mt-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="nim">Nim</FieldLabel>
                <Input
                  id="nim"
                  name="nim"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="file">File</FieldLabel>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0].size < 2.5e7) {
                      setFile(e.target.files[0]);
                    }
                  }}
                  accept="application/zip"
                />
              </Field>
              <Field>
                <Button type="submit">Submit</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
