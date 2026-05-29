'use client'
import { useState } from 'react'
import type { Review, Location } from '@/lib/supabase/types'

type Filter = 'all' | 'pending' | 'posted' | '1' | '2' | '3' | '4' | '5'

export default function ReviewsClient({ reviews, locations }: { reviews: Review[], locations: Pick<Location,'id'|'name'>[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [editingId, setEditingId] = useState<string|null>(null)
  const [editText, setEditText] = useState('')
  const [posting, setPosting] = useState<string|null>(null)

  const filtered = reviews.filter(r => {
    if (filter === 'pending') return !r.responded
    if (filter === 'posted') return r.responded
    if (['1','2','3','4','5'].includes(filter)) return r.rating === Number(filter)
    return true
  })

  async function postResponse(reviewId: string, text: string) {
    setPosting(reviewId)
    await fetch('/api/reviews/respond', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ reviewId, responseText: text })
    })
    setPosting(null)
    window.location.reload()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h1>
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all','pending','posted','5','4','3','2','1'] as Filter[]).map(f => (
          <button key={f} onClick={()=>setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter===f ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            style={filter===f ? {background:'#e3601f'} : {}}>
            {f === 'all' ? 'All' : f === 'pending' ? 'Needs Response' : f === 'posted' ? 'Responded' : `${f}★`}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">No reviews found</div>
        )}
        {filtered.map(review => {
          const loc = locations.find(l => l.id === review.location_id)
          const isEditing = editingId === review.id
          return (
            <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{background:'#1a1a1a'}}>
                    {(review.reviewer_name||'?')[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-gray-900 text-sm">{review.reviewer_name||'Anonymous'}</span>
                      <span className="text-yellow-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                      {loc && <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{loc.name}</span>}
                      <span className="text-xs text-gray-400">{new Date(review.review_date).toLocaleDateString()}</span>
                    </div>
                    {review.content && <p className="text-gray-700 text-sm leading-relaxed">{review.content}</p>}
                  </div>
                </div>
                <span className={`flex-shrink-0 text-xs px-2 py-1 rounded-full font-medium ${review.responded ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                  {review.responded ? 'Responded' : 'Pending'}
                </span>
              </div>
              {review.response_text && (
                <div className="mt-3 ml-12">
                  {!isEditing ? (
                    <div className="p-3 rounded-lg text-sm text-gray-600 leading-relaxed" style={{background:'#fff8f5', borderLeft:'3px solid #e3601f'}}>
                      <div className="text-xs font-medium mb-1" style={{color:'#e3601f'}}>
                        {review.responded ? '✓ Posted Response' : '🤖 AI Draft — Ready to post'}
                      </div>
                      {review.response_text}
                      {!review.responded && (
                        <div className="flex gap-2 mt-3">
                          <button onClick={()=>postResponse(review.id, review.response_text!)} disabled={posting===review.id}
                            className="px-3 py-1.5 rounded-lg text-white text-xs font-medium disabled:opacity-50" style={{background:'#e3601f'}}>
                            {posting===review.id ? 'Posting...' : 'Post Response'}
                          </button>
                          <button onClick={()=>{setEditingId(review.id);setEditText(review.response_text!)}}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium">
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <textarea value={editText} onChange={e=>setEditText(e.target.value)} rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                      <div className="flex gap-2">
                        <button onClick={()=>postResponse(review.id, editText)}
                          className="px-3 py-1.5 rounded-lg text-white text-xs font-medium" style={{background:'#e3601f'}}>Post</button>
                        <button onClick={()=>setEditingId(null)} className="px-3 py-1.5 rounded-lg bg-gray-100 text-xs">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
