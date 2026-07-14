export default function Footer() {
  return (
    <footer className="bg-diamond-800 text-diamond-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl text-primary-300">&#9830;</span>
              <span className="text-lg font-semibold text-white">DiamondEternal</span>
            </div>
            <p className="text-sm leading-relaxed">
              เพชรสังเคราะห์คุณภาพสูง สไตล์มินิมอล ทนทาน สวยงาม เหมาะกับทุกวันของคุณ
            </p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">ติดต่อเรา</h3>
            <div className="space-y-2 text-sm">
              <p>Email: hello@diamondeternal.com</p>
              <p>Tel: 02-123-4567</p>
              <p>Line: @diamondeternal</p>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">เกี่ยวกับเรา</h3>
            <div className="space-y-2 text-sm">
              <p>เพชรแท้ราคาจับต้องได้</p>
              <p>เป็นมิตรต่อสิ่งแวดล้อม 100%</p>
              <p>รับประกันคุณภาพทุกชิ้น</p>
            </div>
          </div>
        </div>
        <div className="border-t border-diamond-700 mt-8 pt-8 text-center text-sm text-diamond-400">
          &copy; 2026 DiamondEternal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
