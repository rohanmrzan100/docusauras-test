import type { Context } from '@netlify/functions';

export default async (req: Request, context: Context): Promise<Response> => {
  const allowedOrigins = [
    'https://www.harness.io',
    'https://dev-site-fe63e9.webflow.io',
    'http://localhost:5500',
  ];

  let header: {
    [key: string]: string;
  } = {
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (allowedOrigins.includes(req.headers.get('origin'))) {
    header = {
      'Access-Control-Allow-Origin': req.headers.get('origin'),
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: header,
    });
  }

  if (req.method !== 'GET') {
    return new Response('Not Implemented', {
      status: 501,
      headers: header,
    });
  }

  const postData = {
    validFor: 43200000, //valid for 12 hrs
    userIds: [
      {
        name: 'guest',
        provider: 'Email Security Provider',
        type: 'User',
      },
    ],
    searchHub: 'WebsiteSearch',
  };
  try {
    const response = await fetch('https://platform.cloud.coveo.com/rest/search/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization: 'Bearer ' + process.env.COVEO_API_KEY,
        Authorization: 'Bearer xx13de1f61-633c-400f-ac4f-86aff30ffa5c',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      return new Response('Failed to fetch token', {
        status: response.status,
        headers: header,
      });
    }

    const data = await response.json();
    if (!data.token) {
      throw new Error('Token not found in response');
    }
    return new Response(
      JSON.stringify({
        token: data.token,
        id: 'harnessproductionp9tivsqy',
      }),
      {
        status: 200,
        headers: header,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: header,
    });
  }
};
