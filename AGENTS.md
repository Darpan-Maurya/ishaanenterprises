<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site content (services, stats, clients, projects, contact) lives in src/lib/site.ts so pages stay in sync.
- Enquiry forms insert via server functions in src/lib/enquiries.functions.ts using the admin client; tables have RLS with no public policies so visitors cannot read submissions.
