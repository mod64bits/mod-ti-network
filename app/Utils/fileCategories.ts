const fileCategories = ['avatar', 'post'] as const //<- Não deixa seus valores serem alterados

type FileCategory = typeof fileCategories[number]

export { fileCategories, FileCategory }
