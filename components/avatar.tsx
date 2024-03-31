/* eslint-disable @next/next/no-img-element */
type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-12 h-12 border rounded-full bg-gray-50 aspect-square">
        <img
          src={picture}
          className="absolute inset-0 object-cover w-full h-full rounded-full"
          alt={name}
        />
      </div>
      <p className="text-gray-800">{name}</p>
    </div>
  );
};

export default Avatar;
