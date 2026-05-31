import { redirect } from "next/navigation";

/** Bio lives on the front page #opinion section */
export default function AboutPage() {
  redirect("/#opinion");
}
