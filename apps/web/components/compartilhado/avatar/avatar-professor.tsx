import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@workspace/ui/components/avatar"

export function AvatarProfessor() {
  return (
    <div className="flex justify-center">
      <Avatar className="h-10 w-20">
        <AvatarImage
          src="/components/compartilhado/avatar/professor.png"
          alt="Professor"
          className="object-center"
        />
        <AvatarBadge className="bg-green-600" />
      </Avatar>
    </div>
  )
}
