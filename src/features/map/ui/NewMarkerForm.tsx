export default function NewMarkerForm() {
  return (
    <div className='flex h-[220px] w-full flex-col items-center'>
      <h2 className='mt-1 text-2xl font-bold'>마커 추가하기</h2>
      <form className='mt-4 flex w-2/3 flex-col'>
        <section className='flex w-full items-center justify-between'>
          <div className='flex w-1/2 items-center pr-2 whitespace-nowrap'>
            <label htmlFor='title' className='mr-2 text-lg font-bold'>
              제목
            </label>
            <input
              type='text'
              id='title'
              name='title'
              className='mt-1 w-full rounded-md border-2 border-gray-300 p-2'
            />
          </div>
          <div className='flex w-1/2 items-center pl-2 whitespace-nowrap'>
            <label htmlFor='location' className='mr-2 text-lg font-bold'>
              세부 위치
            </label>
            <input
              type='text'
              id='location'
              name='location'
              className='mt-1 w-full rounded-md border-2 border-gray-300 p-2'
            />
          </div>
        </section>
        <section className='mt-4 flex items-center whitespace-nowrap'>
          <label htmlFor='address' className='mr-2 text-lg font-bold'>
            주소
          </label>
          <input
            type='text'
            id='address'
            name='address'
            className='mt-1 w-full rounded-md border-2 border-gray-300 p-2'
          />
        </section>
        <button
          type='submit'
          className='mt-4 cursor-pointer rounded-md bg-blue-500 py-2 font-bold text-white hover:bg-blue-600'
        >
          추가하기
        </button>
      </form>
    </div>
  );
}
