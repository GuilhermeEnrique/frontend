import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

//Função para páginas que só pode ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        // Se o usário tentar acessar a página porém já está logado, ele será redirecionado
        if (cookies['@nextauth.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }

        return await fn(ctx);
    }
}