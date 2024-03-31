import { PostTitle } from "@/components/post-title";
import { type Author } from "@/interfaces/author";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  authors: Author[];
};

export function PostHeader({ title, coverImage, date, authors }: Props) {
  return (
    <div className="py-8">
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="mx-auto space-y-8">
        <div className="flex items-center gap-8">
          {authors.map((author) => (
            <Avatar
              key={author.name}
              name={author.name}
              picture={author.picture}
            />
          ))}
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </div>
  );
}
