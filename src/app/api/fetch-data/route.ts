import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") ?? "";
  const limit = searchParams.get("limit") ?? 10;
  const page = searchParams.get("page") ?? 1;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}?search=${search}&limit=${limit}&page=${page}`,
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    }
  );
  const data = await res.json();
  return Response.json({ data });
}
