type ClassType = string | boolean | undefined

export function cn(...classes: ClassType[]): string {
    return classes.filter(Boolean).join(" ")
}
