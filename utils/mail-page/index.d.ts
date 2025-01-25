export type Mails = Mail[]

export interface Mail {
  html: string
  text: string
  headers: Headers
  subject: string
  messageId: string
  priority: string
  from: From[]
  replyTo: ReplyTo[]
  to: To[]
  date: string
  receivedDate: string
  receivedAt: string
}

export interface Headers {
  received: string
  "dkim-signature": string[]
  "return-path": string
  "x-hs-cid": string
  "list-unsubscribe": string
  date: string
  from: string
  "reply-to": string
  to: string
  "message-id": string
  subject: string
  "mime-version": string
  "content-type": string
  "x-report-abuse-to": string
  "list-unsubscribe-post": string
}

export interface From {
  address: string
  name: string
}

export interface ReplyTo {
  address: string
  name: string
}

export interface To {
  address: string
  name: string
}
