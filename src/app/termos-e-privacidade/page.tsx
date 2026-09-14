import type { Metadata } from "next"
import Link from "next/link"
import { getTerms } from "@/app/actions/terms"

export const metadata: Metadata = {
  title: "Termos de Uso e Política de Privacidade | Ruan Teodoro",
  description:
    "Termos de uso e política de privacidade do site Ruan Teodoro Advocacia, em conformidade com a LGPD (Lei 13.709/2018).",
}

export default async function TermosPrivacidadePage() {
  let sections: Awaited<ReturnType<typeof getTerms>> = []
  try {
    sections = await getTerms()
  } catch {
    sections = []
  }

  const lastUpdated =
    sections.length > 0
      ? new Date(
          Math.max(
            ...sections.map((s) => new Date(s.updated_at ?? 0).getTime())
          )
        ).toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : null

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-navy-900">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-display text-xl font-semibold text-white transition-colors duration-200 hover:text-navy-200"
          >
            Ruan Teodoro Advocacia
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
          >
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          Termos de Uso e Política de Privacidade
        </h1>
        {lastUpdated && (
          <p className="mt-3 text-sm text-slate-500">
            Última atualização: {lastUpdated}
          </p>
        )}

        {sections.length > 0 ? (
          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <section key={section.id}>
                <h2 className="font-display text-2xl font-semibold text-navy-900">
                  {section.title}
                </h2>
                <div className="mt-4 whitespace-pre-line leading-relaxed text-slate-600">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <>
            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-navy-900">
                1. Política de Privacidade
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Esta Política de Privacidade descreve como os dados pessoais
                são coletados, utilizados e protegidos neste site, em
                conformidade com a Lei Geral de Proteção de Dados Pessoais
                (LGPD — Lei nº 13.709/2018).
              </p>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                1.1 Dados coletados
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Coletamos apenas os dados estritamente necessários para o
                atendimento:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-slate-600">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Telefone de contato</li>
              </ul>
              <p className="mt-3 leading-relaxed text-slate-600">
                Esses dados são fornecidos voluntariamente pelo visitante ao
                entrar em contato e são utilizados exclusivamente para fins de
                comunicação e atendimento jurídico.
              </p>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                1.2 Finalidade do tratamento
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Os dados pessoais são tratados exclusivamente para responder a
                solicitações de contato, agendar consultas e prestar serviços
                jurídicos. Não vendemos, alugamos ou compartilhamos dados
                pessoais com terceiros para fins comerciais.
              </p>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                1.3 Retenção de dados
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Os dados são mantidos apenas pelo tempo necessário para cumprir
                as finalidades para as quais foram coletados ou para atender a
                obrigações legais aplicáveis. Dados de contatos que não se
                tornam clientes são eliminados em até 12 meses após a última
                interação.
              </p>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                1.4 Direitos do titular (art. 18, LGPD)
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                O titular dos dados pode solicitar a qualquer momento:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-slate-600">
                <li>Confirmação da existência de tratamento</li>
                <li>Acesso aos dados</li>
                <li>
                  Correção de dados incompletos, inexatos ou desatualizados
                </li>
                <li>Anonimização, bloqueio ou eliminação de dados</li>
                <li>Portabilidade dos dados</li>
                <li>Eliminação dos dados tratados com consentimento</li>
                <li>Revogação do consentimento</li>
              </ul>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                1.5 Cookies
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Este site não utiliza cookies de rastreamento ou de terceiros.
                Apenas cookies técnicos essenciais podem ser utilizados para o
                funcionamento básico da página e para manter a sessão de acesso
                restrito à área administrativa.
              </p>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                1.6 Contato para solicitações
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Para exercer seus direitos ou tirar dúvidas sobre esta
                política, entre em contato pelo e-mail{" "}
                <span className="font-medium text-navy-900">
                  contato@ruanteodoro.adv.br
                </span>{" "}
                ou pelo formulário de contato do site.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-navy-900">
                2. Termos de Uso
              </h2>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                2.1 Objeto
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Este site tem caráter exclusivamente informativo e não
                constitui oferta, consulta jurídica ou parecer. O conteúdo aqui
                publicado não substitui a orientação de um advogado
                habilitado.
              </p>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                2.2 Relação advogado-cliente
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                A relação advogado-cliente somente se estabelece mediante a
                assinatura de contrato de honorários. O envio de mensagens por
                meio deste site não cria, por si só, vínculo profissional
                específico.
              </p>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                2.3 Propriedade intelectual
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Todo o conteúdo deste site (textos, imagens, logotipos e
                layout) é protegido pela legislação de propriedade intelectual.
                É vedada a reprodução sem autorização prévia.
              </p>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                2.4 Limitação de responsabilidade
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Não nos responsabilizamos por decisões tomadas com base
                exclusivamente nas informações deste site, nem por
                indisponibilidade temporária do acesso.
              </p>

              <h3 className="mt-8 text-lg font-semibold text-navy-900">
                2.5 Alterações
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Estes termos podem ser atualizados a qualquer momento. A versão
                vigente será sempre a publicada nesta página.
              </p>
            </section>
          </>
        )}
      </main>

      <footer className="border-t border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
          Ruan Teodoro Advocacia — OAB/PR 133.807
        </div>
      </footer>
    </div>
  )
}
