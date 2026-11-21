import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { File } from "@/generated/prisma/client";
import { authClient } from "@/lib/auth-client";

export default function FilesPage() {
  const { data: session, isPending } = authClient.useSession();

  const [files, setFiles] = useState<File[]>([]);

  const fetchData = useCallback(async () => {
    if (session) {
      const { data } = await axios.get(
        `http://localhost:3000/api/files?userId=${session.user.id}`,
      );
      setFiles(data.files);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isPending) {
    return "Loading....";
  }
  if (!session) {
    return "Belum login";
  }

  return (
    <div>
      <h1 className="text-xl">{session.user.name}</h1>
      {files.length < 1 ? (
        <p>Belum ada file</p>
      ) : (
        <div>
          {files.map((f) => (
            <Button
              key={f.id}
              className="p-4"
              render={<Link href={`/files/${f.id}`}>{f.fileUrl}</Link>}
            />
          ))}
        </div>
      )}
    </div>
  );
}
