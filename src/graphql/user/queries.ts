export const queries = {
  hello: () => 'Hey there I am GraphQL server',
  say: (_: any, { name }: { name: string }) => `Hey ${name} how are you?`,
};
