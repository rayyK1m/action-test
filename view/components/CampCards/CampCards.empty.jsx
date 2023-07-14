import Image from 'next/image';

const ASSET_SEARCH = 'https://statics.goorm.io/images/gds/empty_search.svg';

function CampCardsEmpty() {
    return (
        <div className="bg-gray-100 w-100 d-flex flex-column align-items-center py-5 rounded">
            <Image
                src={ASSET_SEARCH}
                alt="검색 리소스"
                width={160}
                height={120}
            />
            <p className="mt-2 text-gray-800">검색 결과가 없습니다.</p>
        </div>
    );
}

export default CampCardsEmpty;
